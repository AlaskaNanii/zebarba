import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = route.data['role']; // Obtém o role esperado da rota

    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Obtém o documento do Firestore para o usuário autenticado
          return this.firestore
  .collection(expectedRole === 'barbeiro' ? 'Barbeiros' : 'Usuários') // Escolhe a coleção correta
  .doc<{ tipo: string }>(user.uid)
  .get()
  .pipe(
    map(doc => {
      const userData = doc.data();
      if (userData?.tipo === expectedRole) {
        return true; // Permissão concedida
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    }),
    catchError(error => {
      console.error('Erro ao buscar dados do Firestore:', error);
      this.router.navigate(['/access-denied']);
      return of(false);
    })
  );

        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
