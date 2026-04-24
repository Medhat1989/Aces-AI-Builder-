import React from 'react';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
}

export interface EditableElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'video' | 'icon' | 'code' | 'map' | 'shape';
  content: string;
  style: React.CSSProperties;
  children?: string[]; // IDs of children
  animation?: {
    type: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'zoom';
    delay: number;
    duration: number;
  };
}

export interface EditorState {
  elements: Record<string, EditableElement>;
  selectedId: string | null;
  history: any[];
}
