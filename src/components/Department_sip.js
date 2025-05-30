import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Search, FileDownload, Close, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import '../css/department_sip.css';

const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#f5f5f5',
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Box)({
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '800px',
  maxHeight: '80vh',
  overflowY: 'auto',
  width: '90%',
});

const DepartmentStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/departments/deptStudents', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('/api/departments/departmentData', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
      });
      saveAs(new Blob([response.data]), 'department_students.csv');
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleViewDetails = async (studentId) => {
    try {
      const response = await axios.get(`/api/departments/studentPrefernces/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSelectedStudent(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.sip_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="department-students-container">
      <Typography variant="h4" gutterBottom>
        Department Students
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          variant="outlined"
          placeholder="Search students..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="search-field"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownload />}
          onClick={handleExport}
          className="export-button"
        >
          Export to CSV
        </Button>
      </Box>

      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>SIP ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Institution</StyledTableCell>
              <StyledTableCell>Program</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.user_id} hover>
                  <TableCell>{student.sip_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.user.email}</TableCell>
                  <TableCell>{student.institution}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(student.user_id)}
                      className="view-button"
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <StyledModal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Student Details: {selectedStudent?.pref1?.student?.name || ''}
            </Typography>
            <IconButton onClick={() => setOpenModal(false)} className="close-button">
              <Close />
            </IconButton>
          </Box>

          {selectedStudent && (
            <div className="student-details-content">
              <Typography variant="subtitle1" gutterBottom>
                <strong>SIP ID:</strong> {selectedStudent.pref1?.student?.sip_id || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Email:</strong> {selectedStudent.pref1?.student?.user?.email || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Institution:</strong> {selectedStudent.pref1?.student?.institution || 'N/A'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Program:</strong> {selectedStudent.pref1?.student?.program || 'N/A'}
              </Typography>

              <Box mt={4} className="preferences-section">
                <Typography variant="h6" gutterBottom>
                  Project Preferences
                </Typography>

                {selectedStudent.pref1 && (
                  <Box mb={4} className="preference-item">
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Preference 1:</strong> {selectedStudent.pref1.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Professor:</strong> {selectedStudent.pref1.professor.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {selectedStudent.pref1.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Prerequisites:</strong> {selectedStudent.pref1.prerequisites}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Duration:</strong> {selectedStudent.pref1.duration}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Mode:</strong> {selectedStudent.pref1.mode}
                    </Typography>
                  </Box>
                )}

                {selectedStudent.pref2 && (
                  <Box mb={4} className="preference-item">
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Preference 2:</strong> {selectedStudent.pref2.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Professor:</strong> {selectedStudent.pref2.professor.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {selectedStudent.pref2.description}
                    </Typography>
                  </Box>
                )}

                {selectedStudent.pref3 && (
                  <Box mb={4} className="preference-item">
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Preference 3:</strong> {selectedStudent.pref3.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Professor:</strong> {selectedStudent.pref3.professor.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Description:</strong> {selectedStudent.pref3.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            </div>
          )}
        </ModalContent>
      </StyledModal>
    </div>
  );
};

export default DepartmentStudents;