import * as React from "react";
import { cn } from "@/lib/utils";
import { UploadIcon, XIcon, FileIcon } from "lucide-react";

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (files: File[]) => void;
  onClear?: () => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  preview?: boolean;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ 
    className, 
    label, 
    helperText, 
    error, 
    errorMessage, 
    onChange, 
    onClear, 
    accept, 
    multiple = false, 
    maxSize, 
    preview = true,
    ...props 
  }, ref) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [dragActive, setDragActive] = React.useState(false);
    const [sizeError, setSizeError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const id = React.useId();
    const fileUploadId = props.id || `file-upload-${id}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles?.length) return;
      
      const fileArray = Array.from(selectedFiles);
      
      // Check file size if maxSize is provided
      if (maxSize) {
        const oversizedFiles = fileArray.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
          setSizeError(`File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} the maximum size of ${maxSizeMB} MB`);
          return;
        }
      }
      
      setSizeError(null);
      setFiles(fileArray);
      onChange?.(fileArray);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      const droppedFiles = e.dataTransfer.files;
      if (!droppedFiles?.length) return;
      
      const fileArray = Array.from(droppedFiles);
      
      // Check file size if maxSize is provided
      if (maxSize) {
        const oversizedFiles = fileArray.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
          setSizeError(`File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} the maximum size of ${maxSizeMB} MB`);
          return;
        }
      }
      
      // Filter files based on accept attribute if provided
      let filteredFiles = fileArray;
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        filteredFiles = fileArray.filter(file => {
          return acceptedTypes.some(type => {
            if (type.startsWith('.')) {
              // Check file extension
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            } else if (type.includes('*')) {
              // Check MIME type with wildcard
              const [mainType, subType] = type.split('/');
              const [fileMainType, fileSubType] = file.type.split('/');
              return mainType === fileMainType && (subType === '*' || subType === fileSubType);
            } else {
              // Check exact MIME type
              return file.type === type;
            }
          });
        });
      }
      
      setSizeError(null);
      setFiles(filteredFiles);
      onChange?.(filteredFiles);
    };

    const handleClear = () => {
      setFiles([]);
      setSizeError(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onClear?.();
    };

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label
            htmlFor={fileUploadId}
            className={cn(
              "text-sm font-medium",
              error && "text-destructive"
            )}
          >
            {label}
          </label>
        )}
        
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-4 transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-input",
            error && "border-destructive",
            "focus-within:border-primary"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id={fileUploadId}
            type="file"
            className="sr-only"
            ref={(el) => {
              // Handle both refs
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
              inputRef.current = el;
            }}
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
            {...props}
          />
          
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            {files.length === 0 ? (
              <>
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Drag & drop {multiple ? "files" : "a file"} or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {accept ? `Accepted formats: ${accept}` : "All file types accepted"}
                    {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={handleButtonClick}
                >
                  Select {multiple ? "Files" : "File"}
                </button>
              </>
            ) : (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    {multiple ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'File selected'}
                  </h4>
                  <button
                    type="button"
                    className="rounded-md p-1 hover:bg-muted"
                    onClick={handleClear}
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {preview && (
                  <div className="space-y-2 max-h-40 overflow-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <FileIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {(helperText || error || sizeError) && (
          <p
            className={cn(
              "text-xs",
              error || sizeError ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {sizeError || errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export { FileUpload };