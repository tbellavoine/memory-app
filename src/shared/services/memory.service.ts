import { Injectable } from '@angular/core';
import { Card } from '../models/card.class';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  // cards = ['☀','✿','☃','★','☁','☂'];
  cards: Card[] = [];
  memoryCards: Card[];
  flippedCards: number;

  gameOver: boolean = false;
  nbClicks: number = 0;

  constructor(private http: HttpClient) { 
    this.getCards();
    this.initMemory();
  }

  getCards(){
    return this.http.get('../../../assets/cards.json').pipe(map((res)=> {
      let cards = JSON.parse(JSON.stringify(res));
      return cards.map(card => new Card(this.guid(), card, false));
    }));
  }

  initMemory(){
    this.gameOver = false;
    this.memoryCards = [];
    this.flippedCards = 0;
    this.nbClicks = 0;
    
    this.cards.map((card)=> {
      card.flipped = false;
    });

    this.cards = [];
    this.getCards().subscribe((datas) => {
      const datasString = JSON.stringify(datas);
      const datasJson = JSON.parse(datasString);
      datasJson.map(card=> {
        this.cards.push(card);
        this.cards.push(Object.assign({}, card));//same card another id
      });
      this.cards = this.shuffle(this.cards);
    });
  }

  restartMemory(){
    this.gameOver = false;
    this.memoryCards = [];
    this.flippedCards = 0;
    this.nbClicks = 0;
    this.cards.map((card)=> {
      card.flipped = false;
    });
  }

  flipCard(card: Card){
    if (!card.flipped && this.memoryCards.length < 2){
      if (this.memoryCards.length === 0) {
        card.flipped = true;
        this.memoryCards.push(card);
      }else if (this.memoryCards.length === 1) {
        card.flipped = true;
        this.memoryCards.push(card);
        if (this.memoryCards[0].id === this.memoryCards[1].id) {
          this.flippedCards += 2;
          this.memoryCards = [];
          if (this.flippedCards === this.cards.length) {
            this.gameOver = true;
          }
        }else {
          setTimeout(()=> {
            this.memoryCards[0].flipped = false;
            this.memoryCards[1].flipped = false;
            this.memoryCards = [];
          }, 500);
        }
      }
      this.nbClicks++;
    }
  }

  shuffle(array){ //TODO : need to understand that

    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };

  /** Generate unique ID */
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
