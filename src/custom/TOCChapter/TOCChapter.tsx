import React, { useState } from 'react';
import { TOCWrapper } from './style';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosArrowDropdownCircle } from '@react-icons/all-files/io/IoIosArrowDropdownCircle';

interface TOCProps {
    availableChapters: string[];
    currentChapter: string | undefined | null;
    onClick: (item: string, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const TOC: React.FC<TOCProps> = ({ availableChapters, currentChapter, onClick }) => {
    const [expand, setExpand] = useState(false);

    const reformatTOC = (data: string): string => {
        const words = data.split('-');
        const formattedString = words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return formattedString;
    };

    return (
        <TOCWrapper>
            <div className="chapter-back">
                <h4 >{reformatTOC(currentChapter?.split(".mdx")[0] ?? '')}</h4>
                <div className="toc-toggle-btn">
                    {expand ? (
                        <IoMdClose
                            className="toc-menu-icon"
                            onClick={() => setExpand(!expand)}
                        />
                    ) : (
                        <IoIosArrowDropdownCircle
                            className="toc-menu-icon"
                            onClick={() => setExpand(!expand)}
                        />
                    )}
                </div>
            </div>
            <div className="toc-list">
                <ul className={`toc-ul ${expand ? 'toc-ul-open' : ''}`}>
                    {availableChapters.map((item) => (
                        <li
                            key={item}
                            className={item + '.mdx' === currentChapter ? 'active-link' : ''}
                            onClick={(e) => {
                                onClick(item, e);
                            }}
                        >
                            <p className="toc-item">{reformatTOC(item)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </TOCWrapper>
    );
};

export default TOC;
