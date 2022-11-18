import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMemo } from "react";

interface IAlertDialog {
  text: string;
  isOpen: boolean;
  onCancel?: () => void;
  onContinue?: () => void;
  btnCancelText?: string;
  btnContinueText?: string;
}

/**
 * AlertDialog is a function that returns a Material UI Dialog component that displays a message and
 * two buttons
 * @param {IAlertDialog}  - IAlertDialog
 * @returns A React component.
 */
export function AlertDialog({
  text,
  isOpen,
  onCancel,
  onContinue,
  btnCancelText,
  btnContinueText,
}: IAlertDialog) {
  /**
   * _handleOnClickCancel() is a function that calls the onCancel prop if onCancel is a function.
   */
  function _handleOnClickCancel() {
    if (typeof onCancel === "function") onCancel();
  }

  /**
   * _handleOnClickContinue() is a function that calls the onContinue prop if it is a function.
   */
  function _handleOnClickContinue() {
    if (typeof onContinue === "function") onContinue();
  }

  const _btnTextCancel = useMemo(
    () => btnCancelText ?? "Cancel",
    [btnCancelText]
  );
  const _btnTextContinue = useMemo(
    () => btnContinueText ?? "Continue",
    [btnContinueText]
  );

  return (
    <Dialog open={isOpen} onClose={_handleOnClickCancel}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={_handleOnClickCancel}>{_btnTextCancel}</Button>
        <Button onClick={_handleOnClickContinue} autoFocus>
          {_btnTextContinue}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
