import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Equipo1Component } from '../equipo-1/equipo-1.component';
import { Equipo2Component } from '../equipo-2/equipo-2.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcador',
  standalone: true,
  imports: [Equipo1Component, Equipo2Component, FormsModule],
  templateUrl: './marcador.component.html',
  styleUrl: './marcador.component.css'
})
export class MarcadorComponent implements OnInit {

  audio!: HTMLAudioElement;

  ngOnInit() {
    // Inicializar el elemento audio después de que el DOM esté listo
    this.audio = document.getElementById('audio') as HTMLAudioElement;

    if (!this.audio) {
      console.error('No se encontró el elemento audio con el id "audio".');
    }
  }

  equipoGanador = ""

  @Output() teamGanador = new EventEmitter
  team_Ganador() { this.teamGanador.emit(this.equipoGanador) }

  @Output() ventanaPrincipal = new EventEmitter
  @Output() ventanaEstadistica = new EventEmitter


  vPrincipal() { this.ventanaPrincipal.emit(false) }
  vestadisticas() { this.ventanaEstadistica.emit(true) }

  cuentaRegresiva = false
  mostrar_Op_Tiempo = false
  personalizarTiempo = false
  partidoComensara = false
  partidoFinalizara = false
  confirmarPartido = false
  confirmarPartido_22 = false

  seletTiempo = true
  valorNumero = 0
  tiempoEstimado: any = "00:00"
  tiempoRestante = 0
  estadoPartido2Padre = "Tie"
  estadoPartido1Padre = "Tie"

  golesEquipo1 = "00"
  golesEquipo2 = "00"


  selectEquipo1 = false
  fondoLogoequipo1 = true
  selectEquipo2 = false
  fondoLogoequipo2 = true
  mostrarLogoequipo1 = false
  mostrarLogoequipo2 = false
  nombreEquipo1 = "Team 1"
  nombreEquipo2 = "Team 2"
  ocultarBtnSelectTeam = true

  imagePath = 'assets/equipoPrincipal/ciudad.png';
  imagePathHijo = '';
  imagePath2 = 'assets/equipoPrincipal/ciudad.png';
  imagePathHijo2 = '';

  @Output() totalGoles_1 = new EventEmitter
  @Output() totalGoles_2 = new EventEmitter
  tGoles1() { this.totalGoles_1.emit(this.golesEquipo1) }
  tGoles2() { this.totalGoles_2.emit(this.golesEquipo2) }
  @Output() nombreTeam1 = new EventEmitter
  @Output() nombreTeam2 = new EventEmitter
  team1() { this.nombreTeam1.emit(this.nombreEquipo1) }
  team2() { this.nombreTeam2.emit(this.nombreEquipo2) }



  mostrarOpTiempo() {
    
    if (!this.mostrar_Op_Tiempo && this. confirmarPartido_22 == false) {
      this.mostrar_Op_Tiempo = true
      this.seletTiempo = false
    } else {
      this.mostrar_Op_Tiempo = false
      this.seletTiempo = true
    }
  }

  cambiartiempo(valor: string) {
    if (valor == "2") {
      this.tiempoEstimado = "2:00"
      this.mostrar_Op_Tiempo = false
      this.seletTiempo = true
      this.confirmarPartido = true
      this.tiempoRestante = 2
      this.btnComenzarFun()
    } else if (valor == "5") {
      this.tiempoEstimado = "5:00"
      this.mostrar_Op_Tiempo = false
      this.seletTiempo = true
      this.confirmarPartido = true
      this.tiempoRestante = 5
      this.btnComenzarFun()
    } else if (valor == "1") {
      this.tiempoEstimado = "1:00"
      this.mostrar_Op_Tiempo = false
      this.seletTiempo = true
      this.confirmarPartido = true
      this.tiempoRestante = 1
      this.btnComenzarFun()
    }
    else if (valor == "p") {
      this.personalizarTiempo = true
      this.mostrar_Op_Tiempo = false
    } else {
      this.mostrar_Op_Tiempo = false
      this.seletTiempo = true
    }
  }

  ocultarTiempoP() {
    this.personalizarTiempo = false
    this.seletTiempo = true
  }

  mostrarTiempo() {
    if (this.valorNumero == 0) {
      alert("Minimo es 1 minuto")
    } else {
      this.tiempoEstimado = `${this.valorNumero}:00`
      this.personalizarTiempo = false
      this.seletTiempo = true
      this.confirmarPartido = true
      this.tiempoRestante = this.valorNumero
      this.btnComenzarFun()
    }
  }
  min = 1
  seg = 0
  comenzarPartido() {
    if (this.confirmarPartido && this.mostrarLogoequipo1 == true && this.mostrarLogoequipo2 == true && this.nombreEquipo1 != this.nombreEquipo2) {
      this.confirmarPartido_22 = true
      this.cuentaRegresiva = true
      this.partidoComensara = true
      this.mostrar_Op_Tiempo = false
      this.audio.play();
      const btnComenzar = document.getElementById('comenzarPartido');
      if (btnComenzar) {
        btnComenzar.style.backgroundColor = 'gray'
        btnComenzar.style.color = "rgba(255, 255, 255, 0.70)"
        btnComenzar.style.fontWeight = '400'
        btnComenzar.style.cursor = 'no-drop'
      }
      this.confirmarPartido = false
      let stop = 0
      setTimeout(() => {
        this.cuentaRegresiva = false
        this.partidoComensara = false
        this.ocultarBtnSelectTeam = false
        const intervalo = setInterval(() => {
          if (this.seg == 0) {
            this.seg = 59
            this.tiempoRestante--
          }
          else {
            if (this.tiempoRestante == 0) {
              this.tiempoEstimado = this.seg
              this.seg--
            }
            else {
              if (this.seg < 10) {
                this.tiempoEstimado = this.tiempoRestante + ":0" + this.seg
                this.seg--
              } else {
                this.tiempoEstimado = this.tiempoRestante + ":" + this.seg
                this.seg--
              }
            }
          }
          if(this.tiempoEstimado === 5){
            this.partidoFinalizara = true
          }
          if (stop == 0) {
            if (this.golesEquipo2 > this.golesEquipo1 && this.tiempoEstimado === 1) {
              this.equipoGanador = this.nombreEquipo2
              stop++
            }
            if (this.golesEquipo2 < this.golesEquipo1 && this.tiempoEstimado === 1) {
              this.equipoGanador = this.nombreEquipo1
              stop++
            }
            if (this.golesEquipo2 == this.golesEquipo1 && this.tiempoEstimado === 1) {
              this.equipoGanador = "Empate"
              stop++
            }
            if (this.tiempoEstimado === 1) {
              this.team_Ganador();
              this.tGoles1(); this.tGoles2();
              this.team1(); this.team2()
              this.vPrincipal();this.vestadisticas();
              this.partidoFinalizara = false
              clearInterval(intervalo);
            }
          }
        }, 1000);
      }, 5600);
    } if (!this.confirmarPartido && this.mostrarLogoequipo1 == false && this.mostrarLogoequipo2 == false) {
      alert("Seleciona un tiempo y a tus 2 equipos! ✨")
    }  if (!this.confirmarPartido && this.mostrarLogoequipo1 == true && this.mostrarLogoequipo2 == true && this.tiempoEstimado == "00:00") {
      alert("Seleciona un tiempo")
    }  if (this.nombreEquipo1 == this.nombreEquipo2) {
      alert("Ambos esquipos son iguales :(")
    }
  }

  pepe(goles_1: string) {
    this.golesEquipo1 = goles_1.toString()
    if (this.golesEquipo1 > this.golesEquipo2) {
      this.estadoPartido2Padre = "Winning"
      this.estadoPartido1Padre = "Losing"
    } else if (this.golesEquipo1 < this.golesEquipo2) {
      this.estadoPartido2Padre = "Losing"
      this.estadoPartido1Padre = "Winning"
    } else {
      this.estadoPartido2Padre = "Tie"
      this.estadoPartido1Padre = "Tie"
    }
  }
  coco(goles_2: string) {
    this.golesEquipo2 = goles_2.toString()
    if (this.golesEquipo2 > this.golesEquipo1) {
      this.estadoPartido1Padre = "Winning"
      this.estadoPartido2Padre = "Losing"
    } else if (this.golesEquipo2 < this.golesEquipo1) {
      this.estadoPartido1Padre = "Losing"
      this.estadoPartido2Padre = "Winning"
    } else {
      this.estadoPartido1Padre = "Tie"
      this.estadoPartido2Padre = "Tie"
    }
  }

  partidoFinalizado() {
    this.confirmarPartido_22 = false
    this.golesEquipo1 = "00"
    this.golesEquipo2 = "00"
    this.estadoPartido2Padre = "Empate"
    this.estadoPartido1Padre = "Empate"
    this.equipoGanador = "Real Madrid"
  }

  btnComenzarFun() {
    if (this.nombreEquipo1 != "Team 1" && this.nombreEquipo2 != "Team 2" && this.nombreEquipo1 != this.nombreEquipo2 && this.tiempoEstimado != "00:00") {
      const btnComenzar = document.getElementById('comenzarPartido');
      if (btnComenzar) {
        btnComenzar.style.backgroundColor = 'rgba(21, 22, 75)'
        btnComenzar.style.color = "white"
        btnComenzar.style.fontWeight = '400'
        btnComenzar.style.cursor = 'pointer'
      }
    }
  }

  // ----------------------------
  // selecionar equipo principal a jugar 
  // ----------------------------

  selectEquipo_1() {
    this.mostrarLogoequipo1 = true
    this.selectEquipo1 = true
    this.fondoLogoequipo1 = false
  }

  equipo1Manchester() {
    this.imagePath = 'assets/equipoPrincipal/ciudad.png';
    this.imagePathHijo = 'assets/seletEquipo/ciudad.png';
    this.nombreEquipo1 = "Manchester"
    this.selectEquipo1 = false
    this.fondoLogoequipo1 = true
    this.btnComenzarFun()
  }

  equipo1Bayern() {
    this.imagePath = 'assets/equipoPrincipal/bayern.png';
    this.imagePathHijo = 'assets/seletEquipo/bayern.png';
    this.nombreEquipo1 = "Bayern"
    this.selectEquipo1 = false
    this.fondoLogoequipo1 = true
    this.btnComenzarFun()
  }

  equipo1Liverpool() {
    this.imagePath = 'assets/equipoPrincipal/liverpool.png';
    this.imagePathHijo = 'assets/seletEquipo/liverpool.png';
    this.nombreEquipo1 = "Liverpool"
    this.selectEquipo1 = false
    this.fondoLogoequipo1 = true
    this.btnComenzarFun()
  }

  equipo1Real() {
    this.imagePath = 'assets/equipoPrincipal/real-madrid.png';
    this.imagePathHijo = 'assets/seletEquipo/real.png';
    this.nombreEquipo1 = "Real"
    this.selectEquipo1 = false
    this.fondoLogoequipo1 = true
    this.btnComenzarFun()
  }

  equipo1Barcelona() {
    this.imagePath = 'assets/equipoPrincipal/barcelona.png';
    this.imagePathHijo = 'assets/seletEquipo/barcelona.png';
    this.nombreEquipo1 = "Barcelona"
    this.selectEquipo1 = false
    this.fondoLogoequipo1 = true
    this.btnComenzarFun()
  }

  selectEquipo_2() {
    this.mostrarLogoequipo2 = true
    this.selectEquipo2 = true
    this.fondoLogoequipo2 = false
  }

  equipo2Manchester() {
    this.imagePath2 = 'assets/equipoPrincipal/ciudad.png';
    this.imagePathHijo2 = 'assets/seletEquipo/ciudad.png';
    this.nombreEquipo2 = "Manchester"
    this.selectEquipo2 = false
    this.fondoLogoequipo2 = true
    this.btnComenzarFun()
  }

  equipo2Bayern() {
    this.imagePath2 = 'assets/equipoPrincipal/bayern.png';
    this.imagePathHijo2 = 'assets/seletEquipo/bayern.png';
    this.nombreEquipo2 = "Bayern"
    this.selectEquipo2 = false
    this.fondoLogoequipo2 = true
    this.btnComenzarFun()
  }

  equipo2Liverpool() {
    this.imagePath2 = 'assets/equipoPrincipal/liverpool.png';
    this.imagePathHijo2 = 'assets/seletEquipo/liverpool.png';
    this.nombreEquipo2 = "Liverpool"
    this.selectEquipo2 = false
    this.fondoLogoequipo2 = true
    this.btnComenzarFun()
  }

  equipo2Real() {
    this.imagePath2 = 'assets/equipoPrincipal/real-madrid.png';
    this.imagePathHijo2 = 'assets/seletEquipo/real.png';
    this.nombreEquipo2 = "Real"
    this.selectEquipo2 = false
    this.fondoLogoequipo2 = true
    this.btnComenzarFun()
  }

  equipo2Barcelona() {
    this.imagePath2 = 'assets/equipoPrincipal/barcelona.png';
    this.imagePathHijo2 = 'assets/seletEquipo/barcelona.png';
    this.nombreEquipo2 = "Barcelona"
    this.selectEquipo2 = false
    this.fondoLogoequipo2 = true
    this.btnComenzarFun()
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleClick();
    }
  }
  
  handleClick(): void {
    console.log('Elemento clicado');
    alert('Elemento clicado');
  }

}
