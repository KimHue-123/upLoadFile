import { Component, OnInit } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [
        trigger('openClose', [
        // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ]
})
export class ProductComponent implements OnInit {
    interval: number = 5000;
    slidess: number = 5;
    proportion: number = 25;
    isOpen = true;
    
    slides = [
             {image: 'https://mdbootstrap.com/img/new/slides/042.jpg'},
             {image: 'https://mdbootstrap.com/img/new/slides/043.jpg'},
             {image: 'https://mdbootstrap.com/img/new/slides/043.jpg'},
             {image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(40).jpg'}
            ];

    constructor() { }

    toggle() {
        this.isOpen = !this.isOpen;
    }
    ngOnInit(): void {
    }

    // cutArray(slide: any){
    //     for(let i = this.index; i < slide.length; i++){
    //         if(this.index < slide.length )
    //     }
    // }

}
