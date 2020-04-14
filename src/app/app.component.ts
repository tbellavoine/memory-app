import { Component } from '@angular/core';
import { MemoryService } from '../shared/services/memory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memory';

  constructor(public memoryService:MemoryService) { }

}
