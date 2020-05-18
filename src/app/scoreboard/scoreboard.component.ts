import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../shared/services/memory.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  nbClicks : number;

  constructor(public memoryService:MemoryService) { }

  ngOnInit(): void {
    this.nbClicks = this.memoryService.nbClicks;
  }

  restartGame(){
    this.memoryService.restartMemory();
  }

}
