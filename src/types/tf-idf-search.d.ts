declare module 'tf-idf-search' {
    class TfIdf {
      createCorpusFromPathArray(paths: string[]): string[];
      createCorpusFromStringArray(docs: string[]): string[];
      addDocumentFromString(doc: string): string[];
      addDocumentFromPath(path: string): string[];
      rankDocumentsByQuery(query: string): any;
    }
  
    export = TfIdf;
  }
  