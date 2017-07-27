// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// App is our top level component
import { AppComponent } from './app.component';

// Styles
import './../styles/styles.scss';

@NgModule({

  // Modulos a serem importados 
  imports: [
    BrowserModule
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  // Componentes que serão usados no Modulo (top level's)
  declarations: [
    AppComponent
  ],
  // Component de inicialização do modulo
  bootstrap: [
    AppComponent
  ],
  providers: []
})
export class AppModule {}