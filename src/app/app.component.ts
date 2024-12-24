import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarcadorComponent } from './marcador/marcador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarcadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Partido_Soccer';

  ventanaPricipal = true
  ventanaEstadistica = false
  ventanaFinal = false
  ventanaFinalEmpate = false

  golesEquipo1 = "0";
  golesEquipo2 = "0";

  nombreTeam1 = "Team 1"
  nombreTeam2 = "Team 2"

  equipoGanador = "Donaxi"
   
  mostrarEquipoGanador(valor: string){this.equipoGanador = valor}

  cambiarNombre1(valor: string){this.nombreTeam1 = valor}
  cambiarNombre2(valor: string){this.nombreTeam2 = valor}

  TOTALSHOTS_1 = this.generarNumeroAleatorio(20, 50)
  TOTALSHOTS_2 = this.generarNumeroAleatorio(20, 50)
  FOULS_1 = this.generarNumeroAleatorio(0, 10)
  FOULS_2 = this.generarNumeroAleatorio(0, 10)
  OFFSIDES_1 = this.generarNumeroAleatorio(0, 20)
  OFFSIDES_2 = this.generarNumeroAleatorio(0, 20)
  CORNERS_1 = this.generarNumeroAleatorio(0, 20)
  CORNERS_2 = this.generarNumeroAleatorio(0, 20)
  

  opGoles = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]

  totalGoles_1(valor: any) {
    let veri = 0
    this.opGoles.forEach(element => {
      if (element == valor) { this.golesEquipo1 = veri.toString() }
      veri++
    });
  }

  totalGoles_2(valor: any) {
    let veri = 0
    this.opGoles.forEach(element => {
      if (element == valor) { this.golesEquipo2 = veri.toString() }
      veri++
    });
  }

  vPrincipal(valor: boolean) { this.ventanaPricipal = valor }
  vEstadistica(valor: boolean) { this.ventanaEstadistica = valor }

  mostrarVentanaFinal() { 
    if(this.equipoGanador != "Empate"){
      this.ventanaEstadistica = false; 
      this.ventanaFinal = true
    }else{
      this.ventanaEstadistica = false; 
      this.ventanaFinalEmpate = true
    } 
  }

  devolverEstadistica() { this.ventanaFinal = false; this.ventanaEstadistica = true }

  finaizarTodo() { 
    this.ventanaPricipal = true; this.ventanaEstadistica = false; 
    this.ventanaFinal = false; this.ventanaFinalEmpate = false 
  }

  generarNumeroAleatorio(min: number, max: number): string {
    const numeroAleatorio = Math.random();
    const numeroEnRango = min + numeroAleatorio * (max - min);
    const numeroComoTexto = numeroEnRango.toFixed(0);
    return numeroComoTexto.toString();
  }
}
