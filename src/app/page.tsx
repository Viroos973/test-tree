'use client';

import {FooterButton} from "@/app/components/FooterButton/FooterButton";
import {useState} from "react";
import {TreeNode} from "@/app/components/TreeNode/TreeNode";
import {Modal} from "@/app/components/Modal/Modal";
import {ModalButton} from "@/app/components/Modal/ModalButton/ModalButton";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<string | null>("1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleOpenAddModal = () => setShowAddModal(true)
  const handleOpenRemoveModal = () => setShowRemoveModal(true)
  const handleOpenEditModal = () => setShowEditModal(true)
  const handleOpenResetModal = () => setShowResetModal(true)
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseResetModal = () => setShowResetModal(false);

  const tree = {
      node: {
          id: '1',
          name: 'Node 1',
          child: [
              {
                  id: '11',
                  name: 'Node 2',
                  child: [
                      {
                          id: '111',
                          name: 'Node 2',
                          child: []
                      },
                      {
                          id: '112',
                          name: 'Node 2',
                          child: [
                              {
                                  id: '1121',
                                  name: 'Node 2',
                                  child: []
                              }
                          ]
                      },
                      {
                          id: '113',
                          name: 'Node 2',
                          child: []
                      },
                  ]
              },
              {
                  id: '12',
                  name: 'Node 3',
                  child: []
              },
              {
                  id: '13',
                  name: 'Node 4',
                  child: [
                      {
                          id: '131',
                          name: 'Node 4',
                          child: []
                      },
                      {
                          id: '132',
                          name: 'Node 4',
                          child: []
                      },
                  ]
              },
              {
                  id: '14',
                  name: 'Node 5',
                  child: []
              }
              ,
              {
                  id: '15',
                  name: 'Node 5',
                  child: [
                      {
                          id: '151',
                          name: 'Node 5',
                          child: []
                      }
                  ]
              }
          ]
      },
      isRoot: true,
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      enclosure: 0
  }

  return (
    <div className="font-sans flex flex-col justify-center items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col w-full flex-1 border rounded-lg bg-[#FFF8F0] overflow-hidden">
          <div className="w-full py-2 bg-[#92140C]">
              <p className="text-center text-3xl font-bold text-white">TREE</p>
          </div>
          <div className="flex-1">
              <TreeNode {...tree}/>
          </div>
          <div className="w-full h-[60px] flex divide-x divide-white">
              <FooterButton onClick={handleOpenAddModal}>ADD</FooterButton>
              <FooterButton onClick={handleOpenRemoveModal}>REMOVE</FooterButton>
              <FooterButton onClick={handleOpenEditModal}>EDIT</FooterButton>
              <FooterButton onClick={handleOpenResetModal}>RESET</FooterButton>
          </div>
          <Modal showModal={showAddModal} onClose={handleCloseAddModal} title={"Add new node"}>
              <input className="w-full border rounded-lg p-2" type="text" id="newNode"
                     placeholder="Enter the name of the new node"/>
              <ModalButton onClick={handleCloseAddModal}>Confirm</ModalButton>
          </Modal>
          <Modal showModal={showRemoveModal} onClose={handleCloseRemoveModal} title={"Remove node"}>
              <p className="text-center text-xl">Are you really sure you want to delete this node?</p>
              <ModalButton onClick={handleCloseRemoveModal}>Confirm</ModalButton>
          </Modal>
          <Modal showModal={showEditModal} onClose={handleCloseEditModal} title={"Edit node"}>
              <input className="w-full border rounded-lg p-2" type="text" id="newNameNode"
                     placeholder="Enter the new name of the node"/>
              <ModalButton onClick={handleCloseEditModal}>Confirm</ModalButton>
          </Modal>
          <Modal showModal={showResetModal} onClose={handleCloseResetModal} title={"Reset tree"}>
              <p className="text-center text-xl">Are you really sure you want to reset the tree?</p>
              <ModalButton onClick={handleCloseResetModal}>Confirm</ModalButton>
          </Modal>
      </main>
    </div>
  );
}
