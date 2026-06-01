import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-lots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-lots.component.html',
  styleUrls: ['./admin-lots.component.css']
})
export class AdminLotsComponent implements OnInit {
  isLoading    = false;
  hasError     = false;
  isSaving     = false;

  // Filtres
  searchTerm   = '';
  filterClient = '';
  filterStatut = '';

  // Modals
  showFormModal   = false;
  showDeleteModal = false;
  isEditing       = false;
  lotToDelete: any = null;

  // Formulaire
  form: any = { reference: '', client: '', date_creation: '', statut: 'EN_COURS' };
  formErrors: any = {};

  // Données mock
  lots: any[] = [
    { id: 1, reference: 'LOT-2026-001', client: 'BMW',      date_creation: new Date('2026-04-01'), statut: 'TERMINE',  nb_grandes_pieces: 4 },
    { id: 2, reference: 'LOT-2026-002', client: 'LandRover',date_creation: new Date('2026-04-03'), statut: 'TERMINE',  nb_grandes_pieces: 3 },
    { id: 3, reference: 'LOT-2026-003', client: 'BMW',      date_creation: new Date('2026-04-05'), statut: 'EN_COURS', nb_grandes_pieces: 2 },
    { id: 4, reference: 'LOT-2026-004', client: 'LandRover',date_creation: new Date('2026-04-10'), statut: 'EN_COURS', nb_grandes_pieces: 5 },
    { id: 5, reference: 'LOT-2026-005', client: 'BMW',      date_creation: new Date('2026-04-15'), statut: 'TERMINE',  nb_grandes_pieces: 3 },
  ];

  filteredLots: any[] = [];

  get lotsTermines() { return this.lots.filter(l => l.statut === 'TERMINE').length; }
  get lotsEnCours()  { return this.lots.filter(l => l.statut === 'EN_COURS').length; }

  ngOnInit() { this.applyFilters(); }

  applyFilters() {
    this.filteredLots = this.lots.filter(l => {
      const matchSearch = !this.searchTerm ||
        l.reference.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchClient = !this.filterClient || l.client === this.filterClient;
      const matchStatut = !this.filterStatut || l.statut === this.filterStatut;
      return matchSearch && matchClient && matchStatut;
    });
  }

  resetFilters() {
    this.searchTerm = ''; this.filterClient = ''; this.filterStatut = '';
    this.applyFilters();
  }

  openCreate() {
    this.isEditing = false;
    this.form = { reference: '', client: '', date_creation: '', statut: 'EN_COURS' };
    this.formErrors = {};
    this.showFormModal = true;
  }

  openEdit(lot: any) {
    this.isEditing = true;
    this.form = {
      id: lot.id,
      reference: lot.reference,
      client: lot.client,
      date_creation: lot.date_creation.toISOString().split('T')[0],
      statut: lot.statut
    };
    this.formErrors = {};
    this.showFormModal = true;
  }

  confirmDelete(lot: any) {
    this.lotToDelete = lot;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showFormModal = false;
    this.showDeleteModal = false;
    this.lotToDelete = null;
  }

  validate(): boolean {
    this.formErrors = {};
    if (!this.form.reference) this.formErrors.reference = 'La référence est obligatoire';
    if (!this.form.client)    this.formErrors.client    = 'Le client est obligatoire';
    if (!this.form.date_creation) this.formErrors.date_creation = 'La date est obligatoire';
    return Object.keys(this.formErrors).length === 0;
  }

  saveLot() {
    if (!this.validate()) return;
    this.isSaving = true;
    setTimeout(() => {
      if (this.isEditing) {
        const idx = this.lots.findIndex(l => l.id === this.form.id);
        if (idx !== -1) {
          this.lots[idx] = { ...this.lots[idx], ...this.form,
            date_creation: new Date(this.form.date_creation) };
        }
      } else {
        this.lots.push({
          id: Date.now(),
          reference: this.form.reference,
          client: this.form.client,
          date_creation: new Date(this.form.date_creation),
          statut: this.form.statut,
          nb_grandes_pieces: 0
        });
      }
      this.isSaving = false;
      this.closeModal();
      this.applyFilters();
    }, 800);
  }

  deleteLot() {
    if (!this.lotToDelete) return;
    this.isSaving = true;
    setTimeout(() => {
      this.lots = this.lots.filter(l => l.id !== this.lotToDelete.id);
      this.isSaving = false;
      this.closeModal();
      this.applyFilters();
    }, 600);
  }
}