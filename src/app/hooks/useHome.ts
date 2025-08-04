import {useState} from "react";
import {CustomNode} from "@/app/components/TreeNode/TreeNode";

export const useHome = () => {
    const initialTree = {
        id: '1',
        name: 'Root',
        child: []
    }

    const [tree, setTree] = useState<CustomNode>(initialTree)
    const [selectedNode, setSelectedNode] = useState<string>("1");
    const [inputAdd, setInputAdd] = useState<string>("");
    const [inputEdit, setInputEdit] = useState<string>("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const handleOpenAddModal = () => setShowAddModal(true)
    const handleOpenRemoveModal = () => setShowRemoveModal(true)
    const handleOpenEditModal = () => setShowEditModal(true)
    const handleOpenResetModal = () => setShowResetModal(true)
    const handleCloseAddModal = () => {
        setInputAdd("")
        setShowAddModal(false)
    };
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleCloseEditModal = () => {
        setInputEdit("")
        setShowEditModal(false)
    };
    const handleCloseResetModal = () => setShowResetModal(false);

    const findNode = (node: CustomNode, targetId: string): CustomNode | null => {
        let currentNode = node;
        const path = targetId.split('-').slice(1);

        for (const childIdPart of path) {
            const targetPath = `${currentNode.id}-${childIdPart}`;
            const foundChild = currentNode.child?.find(child =>
                child.id === targetPath
            );

            if (!foundChild) return null;
            currentNode = foundChild;
        }

        return currentNode;
    };

    const addNode = () => {
        setTree(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const parent = findNode(newTree, selectedNode);

            if (parent && parent.child) {
                const maxNumber = parent.child.reduce((max, child) => {
                    const lastPart = child.id.split('-').pop();
                    const num = parseInt(lastPart || '0');
                    return num > max ? num : max;
                }, 0);

                const newNode = {
                    id: `${parent.id}-${maxNumber + 1}`,
                    name: inputAdd.trim(),
                    child: []
                };

                parent.child.push(newNode);
            }
            return newTree;
        });

        handleCloseAddModal()
    }

    const removeNode = () => {
        setSelectedNode("1")

        setTree(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const parentId = selectedNode.substring(0, selectedNode.lastIndexOf('-'));
            const parent = findNode(newTree, parentId)

            if (parent && parent.child) {
                parent.child = parent.child.filter(child => child.id !== selectedNode);
            }

            return newTree;
        })

        handleCloseRemoveModal()
    }

    const editNode = () => {
        setTree(prevTree => {
            const newTree = JSON.parse(JSON.stringify(prevTree));
            const node = findNode(newTree, selectedNode)

            if (node) {
                node.name = inputEdit.trim()
            }

            return newTree;
        })

        handleCloseEditModal()
    }

    const resetTree = () => {
        setSelectedNode("1")
        setTree(initialTree)
        handleCloseResetModal()
    }

    return {
        state: {
            tree,
            selectedNode,
            showAddModal,
            showRemoveModal,
            showEditModal,
            showResetModal,
            inputAdd,
            inputEdit
        },
        functions: {
            setSelectedNode,
            handleOpenAddModal,
            handleOpenRemoveModal,
            handleOpenEditModal,
            handleOpenResetModal,
            handleCloseAddModal,
            handleCloseRemoveModal,
            handleCloseEditModal,
            handleCloseResetModal,
            setInputAdd,
            setInputEdit,
            addNode,
            removeNode,
            editNode,
            resetTree
        }
    }
}