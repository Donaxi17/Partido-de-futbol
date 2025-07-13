import { ChangeDetectorRef, Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-equipo-1',
  standalone: true,
  imports: [],
  templateUrl: './equipo-1.component.html',
  styleUrl: './equipo-1.component.css'
})
export class Equipo1Component implements OnChanges {

  @Input() confirm?: boolean;
  @Input() cuentaRegresiva?: boolean;
  @Input() estadoPartido!:string;
  @Input() nombreEquipo1?: string
  @Input() imgEquipo?: string
  
  @Output() marcador1 = new EventEmitter<string>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    this.cdr.detectChanges();
    if (this.confirm && !this.cuentaRegresiva) {
      const btnAnotar = document.getElementById('btnAnotar')
      btnAnotar!.style.background = 'white'
      btnAnotar!.style.color = 'black'
      btnAnotar!.style.cursor = 'pointer'
    }
  }

  cantidadGoles = 0
  anotar1(){
    if (this.confirm && !this.cuentaRegresiva) {
      this.cantidadGoles++
      if(this.cantidadGoles<10){
        this.marcador1.emit(`0${this.cantidadGoles.toString()}`)
      }else{
        this.marcador1.emit(this.cantidadGoles.toString())
      }
    }
  }
}
