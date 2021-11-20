import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AuthService } from "./auth.service";
import { Student } from "src/models/student.model";

@Injectable({
    providedIn: "root"
})
export class StudentsService {
    private dbPath = "/students";

    studentRef: AngularFirestoreCollection<Student> = null;

    constructor(private db: AngularFirestore, public auth: AuthService) {
        this.studentRef = db.collection(this.dbPath, (studentRef) => studentRef);
    }

    getSingle(uid: string, cb: Function): void {
        this.studentRef
            .doc(uid)
            .ref.get()
            .then((doc) => {
                if (doc.exists) cb(doc.data());
            })
            .catch((error) => window.alert(error));
    }

    getAll(): AngularFirestoreCollection<Student> {
        return this.studentRef;
    }

    create(student: Student): any {
        return this.studentRef.add({ ...student });
    }

    update(id: string, data: any): Promise<void> {
        return this.studentRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.studentRef.doc(id).delete();
    }
}
