import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../shared/services/memory.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cardList = [];

  constructor(private memoryService:MemoryService) { 
    this.cardList = memoryService.cards;
  }

  ngOnInit(){}
  
}
