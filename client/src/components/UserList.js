import React from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import UserModal from './Modal';

const UserList = ({userList=[]}) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [requiredItem, setRequiredItem] = React.useState();
    const openInNewTab = (url) => {
        const href = "https://wa.me/34" + url;
        const newWindow = window.open(href, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const thisReplaceModalItem = (index) => {
        setRequiredItem(index);
        setOpenModal(false);
    }

  return (
    <>
    { userList.map((val,i) => {
       if (val) {
          return (
            <>
        <tr key={i} onClick={() => thisReplaceModalItem(i)}>
            <td className="pl-4">{i}</td>
            <td>
                <h5 className="font-medium mb-o">{val.nombre} {val.apellido1} {val.apellido2}</h5>
                <span className="text-muted">{val.n_documentacion}</span>
            </td>
            <td>
                <span className="text-muted">{val.email ? val.email : '-----'}</span><br />
                <span className="text-muted" onClick={() => openInNewTab(val.telefono)}><i class="fa fa-whatsapp" aria-hidden="true"></i>{val.telefono ? val.telefono : '----'}</span>
            </td>
            <td>
                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
                    <PlusCircleFill />
                </button>
                <button type='button' className='btn btn-outline-info btn-circle btn-lg btn-circle ml-2'>
                    <i className='fa fa-edit'></i>
                </button>
            </td>
        </tr>
    </>	
    
    	   )	
    	 }
         return null
    }) }
    </>
  );
}

export default UserList;

