import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import {
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, query, orderBy } from 'firebase/firestore';

import firestore from '../../database/firestore';
import styles from './HomePage.module.css';
import HomePageConstants from './HomePageConstants';
import AttachmentComponent from '../../components/Attachment/Attachment';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';

function HomePage() {
  const queryRef = query(collection(firestore, 'users'), orderBy('createdAt', 'desc'));
  const { data, isLoading, isError } = useFirestoreQuery(['users'], queryRef, {
    subscribe: true,
  });

  const snapshot = data;

  return (
    <div className={styles['home-page']}>
      <div className={styles.container}>
        <div className={styles['table-header']}>
          <h3 style={{ marginBottom: '0' }}><strong>Data</strong></h3>
          <div>
            <Link to="/create">
              <button type="button" className="btn btn-primary">Tambah</button>
            </Link>
          </div>
        </div>
        <hr className="solid" />
        {
          isLoading || isError
            ? <div className="tbodyDiv"><SpinnerComponent /></div>
            : (
              <div className="tbodyDiv">
                <table className="table align-middle table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {
                        HomePageConstants.tableHeaders.map((header) => <th scope="col">{header}</th>)
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      snapshot.docs.map((docSnapshot, i) => {
                        const user = docSnapshot.data();
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                            <td>{user.gender}</td>
                            <td>{dayjs(user.birthDate.toDate()).format('DD MMM YYYY')}</td>
                            <td>
                              <AttachmentComponent url={user.selfPhoto} />
                            </td>
                            <td>
                              <AttachmentComponent url={user.cvPhoto} />
                            </td>
                            <td>
                              <AttachmentComponent url={user.certificatePhoto} />
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default HomePage;
