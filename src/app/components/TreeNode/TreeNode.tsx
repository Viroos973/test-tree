'use client';

import { CornerDownRight } from 'lucide-react';
import React from 'react';

export interface CustomNode {
    id: string;
    name: string;
    child?: CustomNode[];
}

interface TreeNodeProps {
    node: CustomNode;
    isRoot: boolean;
    selectedNode: string | null;
    setSelectedNode: (id: string) => void;
    enclosure: number;
}

export const TreeNode = ({ node, isRoot, selectedNode, setSelectedNode, enclosure }: TreeNodeProps) => {
    return (
        <>
            <button
                className={`${ selectedNode === node.id ? 'bg-[#FFCF99]' : 'hover:bg-[#DED8D1]' } 
                cursor-pointer p-2 flex gap-1 items-center w-full text-left`}
                style={{ paddingLeft: `${enclosure * 24 + 8}px` }}
                onClick={() => setSelectedNode(node.id)}
            >
                {!isRoot && <CornerDownRight size={16} />}
                {node.name}
            </button>

            {node.child?.map((childNode) => (
                <TreeNode
                    key={childNode.id}
                    node={childNode}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    isRoot={false}
                    enclosure={isRoot ? enclosure : enclosure + 1}
                />
            ))}
        </>
    );
};