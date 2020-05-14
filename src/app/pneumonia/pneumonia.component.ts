import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-pneumonia',
  templateUrl: './pneumonia.component.html',
  styleUrls: ['./pneumonia.component.css']
})
export class PneumoniaComponent implements OnInit {
  @ViewChild('canvas', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D;
  result: string = "";
  private model: tf.LayersModel;

  constructor() { }

  async loadModel() {
    this.model = await tf.loadLayersModel('assets/pneumonia-densenet/model.json');
    this.setQuickMessage('Model loaded');
  }

  setQuickMessage(msg: string) {
    this.result = msg;
    setTimeout(() => {
      this.result = '';
    }, 2000);
  }

  ngOnInit() {
    this.loadModel();
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  handleFile(files: FileList) : void {
    if (files.length > 0) {
      let f = files[0];
      const currentImage = new Image();
      currentImage.src = URL.createObjectURL(f);

      currentImage.onload = () => {
        this.context.drawImage(currentImage, 0, 0,
          this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        setTimeout(() => {
          this.asyncPredict();
        });
      };
    }
  }

  predict() {
    let w = this.canvas.nativeElement.width;
    let h = this.canvas.nativeElement.height;
    let imageData = this.context.getImageData(0, 0, w, h).data;
    let data = [];
    for (let i = 0; i < h; ++i) {
      let row = []
      for (let j = 0; j < w; ++j) {
        let r = imageData[i * w * 4 + j * 4];
        let g = imageData[i * w * 4 + j * 4 + 1];
        let b = imageData[i * w * 4 + j * 4 + 2];
        let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        row.push(v);
      }
      data.push(row);
    }

    let tensor = tf.tensor(data).reshape([1, h, w, 1]);
    if (this.model) {
      let result = this.model.predict(tensor) as tf.Tensor;
      return result;
    } else {
      return null;
    }
  }

  async asyncPredict() {
    return new Promise(resolve => {
      let result = this.predict();
      if (result) {
        result.print();
        let array = result.arraySync()[0];

        if (array[0] > array[1]) {
          this.result = `Normal: ${array[0].toFixed(6)}`;
        } else {
          this.result = `Pneumonia: ${array[1].toFixed(6)}`;
        }
      } else {
        this.setQuickMessage('Model not ready yet');
      }
      resolve();
    });
  }
}
