export function stringifyIdOfDocument(document: any): any {
  return {
    ...document._doc,
    _id: document._id.toString(),
  };
}

export function stringifyIdOfDocuments(documents: any[]): any[] {
  return documents.map((document) => stringifyIdOfDocument(document));
}
