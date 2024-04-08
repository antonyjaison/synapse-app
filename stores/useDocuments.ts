import { create } from "zustand";
import { Document } from "@/types/document";

type DocumentStoreType = {
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  addDocument: (document: Document) => void;
  documentLoaded: boolean;
  setDocumentLoaded: (documentLoaded: boolean) => void;
};

export const useDocuments = create<DocumentStoreType>((set) => ({
  documents: [],
  setDocuments: (documents: Document[]) =>
    set((state) => ({ ...state, documents })),
  addDocument: (document: Document) =>
    set((state) => ({ ...state, documents: [...state.documents, document] })),
  documentLoaded: false,
  setDocumentLoaded: (documentLoaded: boolean) =>
    set((state) => ({ ...state, documentLoaded })),
}));
