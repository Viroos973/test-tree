'use client';

import {FooterButton} from "@/app/components/FooterButton/FooterButton";
import {TreeNode} from "@/app/components/TreeNode/TreeNode";
import {Modal} from "@/app/components/Modal/Modal";
import {ModalButton} from "@/app/components/Modal/ModalButton/ModalButton";
import {useHome} from "@/app/hooks/useHome";

export default function Home() {
  const {state, functions} = useHome()

  return (
    <div className="font-sans flex flex-col justify-center items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col w-full flex-1 border rounded-lg bg-[#FFF8F0] overflow-hidden">
          <div className="w-full py-2 bg-[#92140C]">
              <p className="text-center text-3xl font-bold text-white">TREE</p>
          </div>
          <div className="flex-1">
              <TreeNode node={state.tree} isRoot={true} selectedNode={state.selectedNode}
                        setSelectedNode={functions.setSelectedNode} enclosure={0} />
          </div>
          <div className="w-full h-[60px] flex divide-x divide-white">
              <FooterButton onClick={functions.handleOpenAddModal}>ADD</FooterButton>
              <FooterButton onClick={functions.handleOpenRemoveModal}>REMOVE</FooterButton>
              <FooterButton onClick={functions.handleOpenEditModal}>EDIT</FooterButton>
              <FooterButton onClick={functions.handleOpenResetModal}>RESET</FooterButton>
          </div>
          <Modal showModal={state.showAddModal} onClose={functions.handleCloseAddModal} title={"Add new node"}>
              <input className="w-full border rounded-lg p-2" type="text" value={state.inputAdd}
                     onChange={(e) => functions.setInputAdd(e.target.value)}
                     placeholder="Enter the name of the new node"/>
              <ModalButton onClick={functions.addNode} disabled={!state.inputAdd.trim()}>
                  Confirm
              </ModalButton>
          </Modal>
          <Modal showModal={state.showRemoveModal} onClose={functions.handleCloseRemoveModal} title={"Remove node"}>
              <p className="text-center text-xl">Are you really sure you want to delete this node?</p>
              <ModalButton onClick={functions.removeNode} disabled={state.selectedNode === "1"}>
                  Confirm
              </ModalButton>
          </Modal>
          <Modal showModal={state.showEditModal} onClose={functions.handleCloseEditModal} title={"Edit node"}>
              <input className="w-full border rounded-lg p-2" type="text"
                     onChange={(e) => functions.setInputEdit(e.target.value)}
                     placeholder="Enter the new name of the node"/>
              <ModalButton onClick={functions.editNode} disabled={!state.inputEdit.trim()}>
                  Confirm
              </ModalButton>
          </Modal>
          <Modal showModal={state.showResetModal} onClose={functions.handleCloseResetModal} title={"Reset tree"}>
              <p className="text-center text-xl">Are you really sure you want to reset the tree?</p>
              <ModalButton onClick={functions.resetTree}>Confirm</ModalButton>
          </Modal>
      </main>
    </div>
  );
}
