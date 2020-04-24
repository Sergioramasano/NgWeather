import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalComponent} from '../../shared/modal/modal.component';
import {RefDirective} from '../../shared/directives/ref.directive';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent {
  @ViewChild(RefDirective) refDir: RefDirective;
  constructor(private resolver: ComponentFactoryResolver) {
  }
  showModal() {
   const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
   this.refDir.containerRef.clear();
   const component = this.refDir.containerRef.createComponent(modalFactory);
   component.instance.title = 'DynamicTitle';
   component.instance.close.subscribe(() => {
     this.refDir.containerRef.clear();
   });
  }
}
