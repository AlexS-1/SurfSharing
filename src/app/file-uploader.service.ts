import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { FileUpload } from './models/file-upload';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BackendDataService } from './backend-data.service';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  private basePath = '/uploads';

  constructor(
    private storage: AngularFireStorage,
    private fdb: AngularFireDatabase,
    private backend: BackendDataService,
    private authService: AuthService
    ){}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(async downloadURL => {
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        const username = await this.authService.getCurrentUserName();
        this.backend.setProfilePicture(username, fileUpload.url);
        this.saveFileData(fileUpload);
      });
    })).subscribe();
    return uploadTask.percentageChanges();
  }

  getFiles(numFiles: number): AngularFireList<FileUpload> {
    return this.fdb.list(this.basePath, ref =>
      ref.limitToLast(numFiles)
    );
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.fdb.list(this.basePath).push(fileUpload);
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.fdb.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

}
