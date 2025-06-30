import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  public menuItems = [
    {
      text: '🎉 Hello Plugin',
      subItems: [
        { text: 'Props', url: 'hello-world/props' },
        { text: 'Write', url: 'hello-world/write' },
        { separator: true },
        { text: 'App', url: 'hello-world/app' },
      ]
    },
    {
      text: '✈️ Advanced Plugin',
      subItems: [
        { text: 'Design', url: 'advanced-field/design' },
        { text: 'Props', url: 'advanced-field/props' },
        { text: 'Write', url: 'advanced-field/write' },
        { separator: true },
        { text: 'App', url: 'advanced-field/app' },
      ]
    },
  ];
}
