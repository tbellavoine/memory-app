import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../shared/models/card.class';
import { MemoryService } from '../../shared/services/memory.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card : Card;

  constructor(private memoryService:MemoryService) { }

  ngOnInit(){}

  flipCard(card : Card){
    this.memoryService.flipCard(card);
  }
}
