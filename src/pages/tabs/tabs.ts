import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { BookPage } from '../book/book';
import { SearchPage } from '../search/search';
import { LoanPage } from '../loan/loan';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BookPage;
  tab3Root = SearchPage;
  tab4Root = LoanPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
