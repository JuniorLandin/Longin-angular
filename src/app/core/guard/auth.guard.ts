import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {

  const router = new Router
  if(!inject(AuthService).isAuthenticated()){
    router.navigate([''])
    return false
  }
  return true;
};
