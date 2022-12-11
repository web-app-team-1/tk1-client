import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './CreateUserPage.module.css';
import FormWarningTextComponent from '../../components/FormWarningText/FormWarningTextComponent';
import { useSubmitForm } from './CreateUserPage.hooks';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import arrowIcon from '../../../public/arrow-back.svg';

function CreateUserPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, success, submitForm } = useSubmitForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/');
  }, [success]);

  return (
    <div className={styles['page-container']}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['navigation-and-title-container']}>
            <div onClick={() => navigate(-1)}>
              <img src={arrowIcon} alt="back" className={styles['back-btn']} />
            </div>
            <h3 style={{ marginBottom: '0' }}><strong>Tambah Data</strong></h3>
          </div>
          <div className={styles['button-group']}>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-primary">Reset Form</button>
          </div>
        </div>
        <hr className="solid" style={{ margin: '0' }} />
        {loading ? <LoadingComponent /> : (
          <div className={styles.form}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Nama</label>
                <input className="form-control" id="validationCustomUsername" aria-describedby="emailHelp" {...register('name', { required: true })} aria-invalid />
                {errors.name && <FormWarningTextComponent text="Nama wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Alamat</label>
                <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('address', { required: true })} />
                {errors.address && <FormWarningTextComponent text="Alamat wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Jenis Kelamin</label>
                <div>
                  <select {...register('gender')}>
                    <option value="M">Laki-laki</option>
                    <option value="F">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Tanggal Lahir</label>
                <div>
                  <input type="date" id="birthday" name="birthday" {...register('birthDate', { required: true })} />
                </div>
                {errors.birthDate && <FormWarningTextComponent text="Tanggal lahir wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Foto</label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept="image/png, image/jpeg, image/doc, image/jpeg, image/pdf" {...register('selfPhoto', { required: true })} />
                </div>
                {errors.selfPhoto && <FormWarningTextComponent text="Foto wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">CV</label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept="image/png, image/jpeg, image/doc, image/jpeg, image/pdf" {...register('cvPhoto', { required: true })} />
                </div>
                {errors.cvPhoto && <FormWarningTextComponent text="Foto CV wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Sertifikat</label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept="image/png, image/jpeg, image/doc, image/jpeg, image/pdf" {...register('certificatePhoto', { required: true })} />
                </div>
                {errors.certificatePhoto && <FormWarningTextComponent text="Foto sertifikat wajib diisi" />}
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUserPage;
