import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from '../../../core/axios';

// Define the type for the selected files
type SelectedFiles = {
  selected: SelectedTypes;
  addSelected: (SelectedType: SelectedType) => void;
  removeSelected: (id: number) => void;
  clearSelected: () => void;
  openOrCloseSelectedFiles: (arg: boolean) => void;
  isOpen: boolean;
  currentPlay: CurrentPlayTypes;
  addtoCurrentPlay: (path: string, format: 'video' | 'audio' | 'image' | 'text' | 'pdf') => void;
};

interface CurrentPlayTypes {
  path: string;
  type: 'video' | 'audio' | 'image' | 'text' | 'pdf' | '';
}

interface SelectedTypes {
  selectedIds: number[];
  selectedFileNames: string[];
  selectedFormat: string[];
}

export interface SelectedType {
  selectedId: number;
  selectedFileName: string;
  selectedFormat: string;
}

const SelectedFilesContext = createContext<SelectedFiles | undefined>(undefined);

type SelectedFilesProviderProps = {
  children: ReactNode;
};

export const useSelectedFiles = (): SelectedFiles => {
  const context = useContext(SelectedFilesContext);
  if (!context) {
    throw new Error('useSelectedFiles must be used within a SelectedFilesProvider');
  }
  return context;
};

export const SelectedFilesProvider = ({ children }: SelectedFilesProviderProps) => {
  const [selected, setSelected] = useState<SelectedTypes>({
    selectedIds: [],
    selectedFileNames: [],
    selectedFormat: [],
  });
  const [currentPlay, setCurrentPlay] = useState<CurrentPlayTypes>({ path: '', type: '' });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addSelected = ({ selectedFormat, selectedFileName, selectedId }: SelectedType) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      selectedIds: [...prevSelected.selectedIds, selectedId],
      selectedFileNames: [...prevSelected.selectedFileNames, selectedFileName],
      selectedFormat: [...prevSelected.selectedFormat, selectedFormat],
    }));
  };
  const clearSelected = () => {
    setSelected({
      selectedIds: [],
      selectedFileNames: [],
      selectedFormat: [],
    });
  };

  const addtoCurrentPlay = (path: string, format: 'video' | 'audio' | 'image' | 'text' | 'pdf') => {
    const videoName = path.split('/').pop();
    if (format === 'video') {
      setCurrentPlay({ path: `${axios.defaults.baseURL}/video/stream/${videoName}`, type: format });
    } else {
      setCurrentPlay({ path: `${axios.defaults.baseURL}/uploads/${path}`, type: format });
    }
  };

  const openOrCloseSelectedFiles = (arg: boolean) => {
    setIsOpen(arg);
  };

  const removeSelected = (id: number) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      selectedIds: prevSelected.selectedIds.filter((selectedId) => selectedId !== id),
      selectedFileNames: prevSelected.selectedFileNames.filter(
        (_, index) => prevSelected.selectedIds[index] !== id
      ),
      selectedFormat: prevSelected.selectedFormat.filter(
        (_, index) => prevSelected.selectedIds[index] !== id
      ),
    }));
  };

  return (
    <SelectedFilesContext.Provider
      value={{
        selected,
        addSelected,
        removeSelected,
        clearSelected,
        openOrCloseSelectedFiles,
        isOpen,
        addtoCurrentPlay,
        currentPlay,
      }}
    >
      {children}
    </SelectedFilesContext.Provider>
  );
};
