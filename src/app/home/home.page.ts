import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories/tea-categories.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  databaseName: string;
  databasePath: string;
  categories: Array<TeaCategory>;

  constructor(
    private teaCategories: TeaCategoriesService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    this.categories = await this.teaCategories.getAll();
  }

  addTeaCategory() {
    this.navController.navigateForward(['tea-category-editor']);
  }

  editTeaCategory(id: string) {
    console.log('edit', id);
    this.navController.navigateForward(['tea-category-editor', id]);
  }
}
