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
  type: 'text' | 'image' | 'button' | 'container' | 'video';
  content: string;
  style: React.CSSProperties;
  children?: string[]; // IDs of children
}

export interface EditorState {
  elements: Record<string, EditableElement>;
  selectedId: string | null;
  history: any[];
}
