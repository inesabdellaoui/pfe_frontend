import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  path: string;
  svg: SafeHtml;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  currentUser: any = null;
  currentPath = '';
  menuGroups: MenuGroup[] = [];
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private icon(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">${path}</svg>`
    );
  }

  ngOnInit() {
    this.menuGroups = [
      {
        label: 'Analyse',
        items: [
          {
            label: "Vue d'ensemble",
            path: '/angular-dashboard',
            svg: this.icon('<rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/>')
          },
          {
            label: 'Analyse des défauts',
            path: '/dashboard/defects',
            svg: this.icon('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>')
          },
          {
            label: 'Performances',
            path: '/performance',
            svg: this.icon('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>')
          },
          {
            label: 'Analyse par lot',
            path: '/lot-analysis',
            svg: this.icon('<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>')
          },
          {
  label: 'Tableau de bord Power BI',
  path: '/dashboard',
  svg: this.icon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>')
},
        ]
      },
      {
        label: 'Suivi',
        items: [
          {
            label: 'Traçabilité',
            path: '/traceability',
            svg: this.icon('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>')
          },
          {
            label: 'Images NIO',
            path: '/nio-images',
            svg: this.icon('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>')
          },
          
        ]
      },
      {
        label: 'Système',
        items: [
          {
            label: 'Paramètres',
            path: '/angular-dashboard',
            svg: this.icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>')
          },
          {
            label: 'Utilisateurs',
            path: '/admin/users',
            svg: this.icon('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>')
          },
          {
      label: 'Gestion des lots',
      path: '/admin/lots',
      svg: this.icon('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>')
    },
        ]
      }
    ];

    this.currentUser = this.authService.getCurrentUser();

    if (this.isBrowser) {
      const saved = localStorage.getItem('sidebarCollapsed');
      this.isCollapsed = saved === 'true';
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath = this.router.url;
    });

    this.currentPath = this.router.url;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isBrowser) {
      localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
      window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: this.isCollapsed }));
    }
  }

  isActive(path: string): boolean {
    return this.currentPath === path;
  }

  logout() {
    this.authService.logout();
  }

  get userInitials(): string {
    const u = this.currentUser;
    if (!u) return '?';
    return `${u.prenom?.[0] ?? ''}${u.nom?.[0] ?? ''}`.toUpperCase();
  }

  get userRoleLabel(): string {
    const roles: Record<string, string> = {
      admin: 'Administrateur',
      responsable_qualite: 'Resp. Qualité',
      operatrice_bmw: 'Opératrice BMW',
      operatrice_rr: 'Opératrice RR',
    };
    return roles[this.currentUser?.role] ?? this.currentUser?.role ?? 'Utilisateur';
  }
}