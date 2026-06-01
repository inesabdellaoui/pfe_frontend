import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardKpis {
  totalInspections: number;
  piecesOK: number;
  piecesNIO: number;
  mdr: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  getKpis(): Observable<DashboardKpis> {
    return this.http.get<DashboardKpis>(`${this.apiUrl}/kpis`);
  }
  getInspectionsTrend() {
  return this.http.get<any[]>(`${this.apiUrl}/inspections-trend`);
}

getTopLots() {
  return this.http.get<any[]>(`${this.apiUrl}/top-lots`);
}

getDefectsDistribution() {
  return this.http.get<any[]>(`${this.apiUrl}/defects-distribution`);
}

getKpisFiltered(params: any) {
  return this.http.get(`${this.apiUrl}/kpis-filtered`, { params });
}
getDefectsKpis(params: any) {
  return this.http.get(`${this.apiUrl}/defects-kpis`, { params });
}

getDefectsBySeverity() {
  return this.http.get<any[]>(`${this.apiUrl}/defects-by-severity`);
}

getDefectsTrend() {
  return this.http.get<any[]>(`${this.apiUrl}/defects-trend`);
}

getTopDefectsLots() {
  return this.http.get<any[]>(`${this.apiUrl}/top-defects-by-lot`);
}

// Ajouter dans src/app/core/services/dashboard.service.ts

// ─── Performances ────────────────────────────────
getPerfKpis() {
  return this.http.get<any>(`${this.apiUrl}/perf-kpis`);
}
getPerfTrend() {
  return this.http.get<any[]>(`${this.apiUrl}/perf-trend`);
}
getPerfByClient() {
  return this.http.get<any[]>(`${this.apiUrl}/perf-by-client`);
}
getPerfByOperatrice() {
  return this.http.get<any[]>(`${this.apiUrl}/perf-by-operatrice`);
}

// ─── Lots ─────────────────────────────────────────
getLotsKpis() {
  return this.http.get<any>(`${this.apiUrl}/lots-kpis`);
}
getLotsList(params?: any) {
  return this.http.get<any[]>(`${this.apiUrl}/lots-list`, { params });
}
getLotsTopProblematic() {
  return this.http.get<any[]>(`${this.apiUrl}/lots-top-problematic`);
}
getLotDetail(id: string) {
  return this.http.get<any>(`${this.apiUrl}/lot-detail/${id}`);
}

// Ajouter dans src/app/core/services/dashboard.service.ts

private baseUrl = 'http://localhost:3000';

// ─── Traçabilité ──────────────────────────────────────
searchPieces(params?: any) {
  return this.http.get<any[]>(`${this.apiUrl}/traceability/search`, { params });
}
getPieceDetail(id: string) {
  return this.http.get<any>(`${this.apiUrl}/traceability/piece/${id}`);
}

// ─── Images NIO ───────────────────────────────────────
getNioImages(params?: any) {
  return this.http.get<any[]>(`${this.apiUrl}/nio-images`, { params });
}
getNioImageDetail(id: string) {
  return this.http.get<any>(`${this.apiUrl}/nio-images/${id}`);
}

// ─── Rapport ──────────────────────────────────────────
getPieceRapport(id: string) {
  return this.http.get<any>(`${this.apiUrl}/rapport/piece/${id}`);
}

// URL image helper
getImageUrl(path: string): string {
  if (!path) return 'assets/images/no-image.png';
  
  // Chemin SHAP → préfixe /shap
  if (path.includes('shap_outputs')) {
    const clean = path.replace(/\\/g, '/').split('shap_outputs/')[1];
    return `http://localhost:3000/shap/${clean}`;
  }
  
  // Chemin uploads normal
  const clean = path.replace(/\\/g, '/').split('uploads/')[1];
  return `http://localhost:3000/uploads/${clean}`;
}

sendRapportByMail(pieceId: string, email: string) {
  return this.http.post(`${this.apiUrl}/rapport/send-mail`, { pieceId, email });
}
}
