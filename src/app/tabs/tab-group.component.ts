import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabPanelComponent } from './tab-panel.component';

@Component({
  selector: 'tab-group',
  template: `
    <div class="tab-headers">
      <div class="tab-header-item" 
      *ngFor="let tab of tabPanelList;let idx = index" 
      (click)="activeIndexChange.emit(idx)">
        {{tab.title}}
        <button (click) = "removeTab(tab)">x</button>
      </div>
    </div>

    <div class="tab-body" *ngIf="tabPanelList.length;else noTabs">
      <ng-container *ngTemplateOutlet="tabPanelList[activeIndex].panelBody">
      </ng-container>
    </div>
    <ng-template #noTabs>
      No more tabs
    </ng-template>
  `,
  styles: [],
})
export class TabGroupComponent {
  tabPanelList: TabPanelComponent[] = [];
  @Input() activeIndex = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  addTab(tab: TabPanelComponent) {
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  removeTab(tab: TabPanelComponent) {
    let found = -1;
    this.tabPanelList = this.tabPanelList.filter((tp, index) => {
      if (tp === tab) {
        found = index;
        return false;
      }
      return true;
    });

    if (found === this.activeIndex) {
      this.activeIndexChange.emit(
        found === this.tabPanelList.length ? found - 1 : found
      );
    }
  }
}
