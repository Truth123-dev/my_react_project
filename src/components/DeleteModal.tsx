  
interface Props {
  open : boolean,
  onClose: () => void;
  onDelete: () => void;

}

function DeleteModal ({ open , onClose , onDelete ,} : Props) {
     if (!open)return null;

     return (
             <div className="fixed inset-0 bg-black/50 flex justify-center
             items-center"
             > 
             <div className="bg-white p-5 rounded">
                 <h2>
                    Delete todo
                 </h2>

                 <div className="flex gap-2 mt-4">
                    <button 
                        onClick={onClose}
                    >
                       Yes
                    </button>

                    <button 
                        onClick={onDelete}
                    >
                       No
                    </button>
                 </div>

             </div>
             </div>
     );
}
export default DeleteModal;