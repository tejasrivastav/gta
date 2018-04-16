import { Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeMediaQuery;
  mode: String = "side";
  opened: boolean = false;
  constructor(private media: ObservableMedia) { }

  ngOnInit() {
    let self = this;
    let watcher = this.media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias == 'xs') {
        self.mode = "push";
        self.opened = false;
      } else {
        self.mode = "side";
        self.opened = false;
      }
    });
  }
}
