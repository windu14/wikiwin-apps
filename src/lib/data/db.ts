import { collection, getDocs, addDoc, doc, getDoc, updateDoc, query as fsQuery, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface DataItem {
  id?: string;
  type: 'cv' | 'akademis' | 'jurnal' | 'dokumen' | 'seni';
  title: string;
  description: string;
  content?: string;
  tags: string[];
  link?: string;
  gdriveLink?: string;
  isLocked?: boolean;
  date?: string;
  author?: string;
  createdAt?: any; // Firestore Timestamp
  editCount?: number;
  lastEditNote?: string;
  lastEditDate?: string;
  externalUrl?: string;
}

const COLLECTION_NAME = 'documents';

// Fetch all data from Firestore
export async function getAllData(): Promise<DataItem[]> {
  try {
    const q = fsQuery(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const data: DataItem[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as DataItem);
    });
    return data;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
}

export async function searchData(queryStr: string): Promise<DataItem[]> {
  const allData = await getAllData();
  
  if (!queryStr.trim()) return allData;
  const lowerQuery = queryStr.toLowerCase();
  
  return allData.filter(item => 
    item.title?.toLowerCase().includes(lowerQuery) ||
    item.description?.toLowerCase().includes(lowerQuery) ||
    item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    item.type?.toLowerCase().includes(lowerQuery)
  );
}

export async function getDataById(id: string): Promise<DataItem | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as DataItem;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

export async function addDocument(data: DataItem): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      editCount: 0,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

export async function updateDocument(id: string, data: Partial<DataItem>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const currentDoc = await getDoc(docRef);
    let currentEditCount = 0;
    
    if (currentDoc.exists()) {
      const currentData = currentDoc.data() as DataItem;
      currentEditCount = currentData.editCount || 0;
    }
    
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = dd + '/' + mm + '/' + yyyy;

    await updateDoc(docRef, {
      ...data,
      editCount: currentEditCount + 1,
      lastEditDate: formattedDate
    });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}
