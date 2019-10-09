import { Component } from '@angular/core';
import { dictionary } from '../assets/dictionaries/english';

const red = '#b02300';
const green = '#'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brp';
  brp = 'brp';
  value = 'burp';
  lastResult = true;
  lastWord = 'burp';
  lastMeaning = dictionary['burp'];
  points = 0;
  clear(){
    this.value = '';
  }
  attempt(){
    if(this.value.length< 3) return;
    const word = this.value.toLowerCase();

    const meaning = dictionary[word];
    if(!meaning) {
      this.lastResult = false;
      this.points--;
      this.value = '';
      this.lastWord = word;
      this.lastMeaning = '';
      return;
    }

    this.lastWord = word;
    this.lastMeaning = meaning;

    const indexes = this.brp.toLowerCase().split('').map(c => word.indexOf(c));
    if(indexes.some(i => i === -1)) {
      this.lastResult = false;
      this.points--;
      this.value = '';
      return;
    }

    const indexList = indexes.join(',');
    const orderList = indexes.sort().join(',');
    this.points += this.value.length * (indexList === orderList ? 3 : 1);
    this.lastResult = true;
    this.value = '';
  }
}
