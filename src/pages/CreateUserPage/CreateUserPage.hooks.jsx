import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useFirestoreCollectionMutation,
} from '@react-query-firebase/firestore';
import { collection } from 'firebase/firestore';
import storage from '../../database/storage';

import firestore from '../../database/firestore';

const uploadFile = (file) => new Promise((resolve, reject) => {
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    () => { },
    reject,
    () => { getDownloadURL(uploadTask.snapshot.ref).then(resolve); },
  );
});

export const useSubmitForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const storageRef = collection(firestore, 'users');
  const mutation = useFirestoreCollectionMutation(storageRef);

  const submitForm = async (form) => {
    setLoading(true);

    try {
      const [selfPhotoUrl, cvPhotoUrl, certificatePhotoUrl] = await Promise.all([
        uploadFile(form.selfPhoto[0]),
        uploadFile(form.cvPhoto[0]),
        uploadFile(form.certificatePhoto[0]),
      ]);

      await mutation.mutateAsync({
        name: form.name,
        address: form.address,
        gender: form.gender,
        birthDate: new Date(form.birthDate),
        selfPhoto: selfPhotoUrl,
        cvPhoto: cvPhotoUrl,
        certificatePhoto: certificatePhotoUrl,
        createdAt: new Date(),
      });

      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
    }

    setLoading(false);
  };

  return { loading, success, submitForm };
};
