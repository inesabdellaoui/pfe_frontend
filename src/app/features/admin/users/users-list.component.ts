import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  isLoading  = false;
  isSaving   = false;
  hasError   = false;

  // Filtres
  searchTerm  = '';
  filterRole  = '';

  // Modals
  showFormModal   = false;
  showDeleteModal = false;
  isEditing       = false;
  userToDelete: any = null;

  // Formulaire
  form: any = { prenom: '', nom: '', email: '', role: '', password: '', isActive: true };
  formErrors: any = {};

  // Données mock
  users: any[] = [
    { id: 1, prenom: 'Yasmine', nom: 'Ahmed',    email: 'y.ahmed@draexlmaier.com',    role: 'RESPONSABLE_QUALITE', isActive: true  },
    { id: 2, prenom: 'Mohamed', nom: 'Zitouni',  email: 'm.zitouni@draexlmaier.com',  role: 'ADMIN',               isActive: true  },
    { id: 3, prenom: 'Salma',   nom: 'Trabelsi', email: 's.trabelsi@draexlmaier.com', role: 'CIP',                 isActive: true  },
    { id: 4, prenom: 'Ines',    nom: 'Bensalem', email: 'i.bensalem@draexlmaier.com', role: 'RESPONSABLE_QUALITE', isActive: false },
    { id: 5, prenom: 'Karim',   nom: 'Bouali',   email: 'k.bouali@draexlmaier.com',   role: 'CIP',                 isActive: true  },
  ];

  filteredUsers: any[] = [];

  get totalUsers()  { return this.users.length; }
  get activeUsers() { return this.users.filter(u => u.isActive).length; }
  get adminUsers()  { return this.users.filter(u => u.role === 'ADMIN').length; }

  ngOnInit() { this.applyFilters(); }

  applyFilters() {
    this.filteredUsers = this.users.filter(u => {
      const matchSearch = !this.searchTerm ||
        `${u.prenom} ${u.nom} ${u.email}`.toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchRole = !this.filterRole || u.role === this.filterRole;
      return matchSearch && matchRole;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.filterRole = '';
    this.applyFilters();
  }

  openCreate() {
    this.isEditing = false;
    this.form = { prenom: '', nom: '', email: '', role: '', password: '', isActive: true };
    this.formErrors = {};
    this.showFormModal = true;
  }

  openEdit(user: any) {
    this.isEditing = true;
    this.form = { ...user, password: '' };
    this.formErrors = {};
    this.showFormModal = true;
  }

  confirmDelete(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showFormModal   = false;
    this.showDeleteModal = false;
    this.userToDelete    = null;
  }

  validate(): boolean {
    this.formErrors = {};
    if (!this.form.prenom) this.formErrors.prenom = 'Le prénom est obligatoire';
    if (!this.form.nom)    this.formErrors.nom    = 'Le nom est obligatoire';
    if (!this.form.email)  this.formErrors.email  = 'L\'email est obligatoire';
    if (!this.form.role)   this.formErrors.role   = 'Le rôle est obligatoire';
    if (!this.isEditing && !this.form.password)
      this.formErrors.password = 'Le mot de passe est obligatoire';
    return Object.keys(this.formErrors).length === 0;
  }

  saveUser() {
    if (!this.validate()) return;
    this.isSaving = true;
    setTimeout(() => {
      if (this.isEditing) {
        const idx = this.users.findIndex(u => u.id === this.form.id);
        if (idx !== -1) this.users[idx] = { ...this.users[idx], ...this.form };
      } else {
        this.users.push({ id: Date.now(), ...this.form });
      }
      this.isSaving = false;
      this.closeModal();
      this.applyFilters();
    }, 800);
  }

  deleteUser() {
    if (!this.userToDelete) return;
    this.isSaving = true;
    setTimeout(() => {
      this.users = this.users.filter(u => u.id !== this.userToDelete.id);
      this.isSaving = false;
      this.closeModal();
      this.applyFilters();
    }, 600);
  }

  getRoleLabel(role: string): string {
    const map: Record<string, string> = {
      ADMIN:               'Administrateur',
      RESPONSABLE_QUALITE: 'Resp. Qualité',
      CIP:                 'Resp. CIP',
    };
    return map[role] ?? role;
  }

  getRoleClass(role: string): string {
    const map: Record<string, string> = {
      ADMIN:               'badge-admin',
      RESPONSABLE_QUALITE: 'badge-rq',
      CIP:                 'badge-cip',
    };
    return map[role] ?? '';
  }

  getInitials(prenom: string, nom: string): string {
    return `${prenom?.[0] ?? ''}${nom?.[0] ?? ''}`.toUpperCase();
  }
}