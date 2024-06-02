import { ReactElement } from 'react';

export function Modal({ children }: { children: ReactElement }) {
    return (
        <div className="modal modal-open">
            <div className="modal-box">{children}</div>
        </div>
    );
}
