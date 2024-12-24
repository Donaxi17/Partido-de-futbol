import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-equipo-2',
  standalone: true,
  imports: [],
  templateUrl: './equipo-2.component.html',
  styleUrl: './equipo-2.component.css'
})
export class Equipo2Component {

  @Input() confirm?: boolean;
  @Input() cuentaRegresiva?: boolean;
  @Input() estadoPartido!: string;
  @Input() nombreEquipo2?: string
  @Input() imgEquipo?: string


  @Output() marcador2 = new EventEmitter<String>()

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    this.cdr.detectChanges();
    if (this.confirm && !this.cuentaRegresiva) {
      const btnAnotar = document.getElementById('btnAnotar2')
      btnAnotar!.style.background = 'white'
      btnAnotar!.style.color = 'black'
      btnAnotar!.style.cursor = 'pointer'
    }
  }

  cantidadGoles = 0
  anotar2() {
    if (this.confirm && !this.cuentaRegresiva) {
      this.cantidadGoles++
      if (this.cantidadGoles < 10) {
        this.marcador2.emit(`0${this.cantidadGoles.toString()}`)
      } else {
        this.marcador2.emit(this.cantidadGoles.toString())
      }
    }
  }
}
