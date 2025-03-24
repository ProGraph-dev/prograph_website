import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './style.module.scss';
import CloseIcon from '@/components/atoms/Icons/CloseIcon';
import UploadIcon from '@/components/atoms/Icons/UploadIcon';
import DocumentIcon from '@/components/atoms/Icons/DocumentIcon';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (files: File[]) => void;
}

export default function FileUploadModal({ isOpen, onClose, onSend }: FileUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSend = () => {
    onSend(files);
    setFiles([]);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={classes.FileUploadModal}>
      <div className={classes.FileUploadModal__backdrop} onClick={onClose} />
      <div className={classes.FileUploadModal__content}>
        <div className={classes.FileUploadModal__header}>
          <h3>Upload Files</h3>
          <button className={classes.FileUploadModal__closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className={classes.FileUploadModal__body}>
          <div {...getRootProps()} className={classes.FileUploadModal__dropzone}>
            <input {...getInputProps()} />
            <UploadIcon />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
          
          {files.length > 0 && (
            <div className={classes.FileUploadModal__fileList}>
              {files.map((file, index) => (
                <div key={index} className={classes.FileUploadModal__file}>
                  <div className={classes.FileUploadModal__fileInfo}>
                    <DocumentIcon />
                    <div className={classes.FileUploadModal__fileDetails}>
                      <span className={classes.FileUploadModal__fileName}>{file.name}</span>
                      <span className={classes.FileUploadModal__fileSize}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    className={classes.FileUploadModal__removeButton}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className={classes.FileUploadModal__footer}>
          <button 
            className={classes.FileUploadModal__cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={classes.FileUploadModal__sendButton}
            onClick={handleSend}
            disabled={files.length === 0}
          >
            Send Files
          </button>
        </div>
      </div>
    </div>
  );
}