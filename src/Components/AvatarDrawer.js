import React from 'react';
import { NavLink } from 'react-router-dom';

const AvatarDrawer = ({ onClose, onLogout }) => {
    return (
        <div className="avatar-drawer">
            <ul className="list-unstyled">
                <li>
                    <button className="btn btn-link" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AvatarDrawer;
