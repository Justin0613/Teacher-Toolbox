import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { AuthService } from "./auth.service";
import Classroom from "src/models/classroom.model";

@Injectable({
    providedIn: "root"
})
export class ClassroomService {
    private dbPath = "/classrooms";

    classroomRef: AngularFirestoreCollection<Classroom> = null;

    constructor(private db: AngularFirestore, public auth: AuthService) {
        this.classroomRef = db.collection(this.dbPath, (classroomRef) =>
            classroomRef.where("teacherID", "==", this.auth.userState.uid)
        );
    }

    getAll(): AngularFirestoreCollection<Classroom> {
        return this.classroomRef;
    }

    getSingle(uid: string, cb: Function): void {
        this.classroomRef
            .doc(uid)
            .ref.get()
            .then((doc) => {
                if (doc.exists) cb(doc.data());
            })
            .catch((error) => window.alert(error));
    }

    create(classroom: Classroom): any {
        classroom.studentIDs = [];
        return this.classroomRef.add({ ...classroom });
    }

    update(id: string, data: any): Promise<void> {
        return this.classroomRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.classroomRef.doc(id).delete();
    }
}
