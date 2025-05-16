import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
declare const monaco: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
onSubmit() {
throw new Error('Method not implemented.');
}
onBack() {
throw new Error('Method not implemented.');
}
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  ngAfterViewInit(): void {
    const onGotAmdLoader = () => {
      // Load Monaco
      (window as any).require.config({ paths: { 'vs': 'assets/monaco/vs' } });
      (window as any).require(['vs/editor/editor.main'], () => {
        monaco.editor.create(this.editorContainer.nativeElement, {
          value: `function helloWorld() {\n  console.log("Hello, world!");\n}`,
          language: 'javascript',
          theme: 'vs-dark',
          automaticLayout: true,
          lineNumbers: 'on',
        });
      });
    };

    // Load AMD loader if necessary
    if (!(window as any).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'assets/monaco/vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }
}
