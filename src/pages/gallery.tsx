import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Layout from '../components/Layout';

const galleryImages = [
  { id: 1, alt: 'Classic haircut style' },
  { id: 2, alt: 'Modern beard trim' },
  { id: 3, alt: 'Hot towel shave service' },
  { id: 4, alt: 'Premium grooming experience' },
  { id: 5, alt: 'Barber shop interior' },
  { id: 6, alt: 'Professional hair styling' },
];

export default function Gallery() {
  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Our Gallery
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 6 }}>
            Showcasing our finest work and premium barbering experience
          </Typography>
          
          <Grid container spacing={4}>
            {galleryImages.map((image) => (
              <Grid item xs={12} sm={6} md={4} key={image.id}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 300,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 2,
                  }}
                >
                  <Image
                    src={`/images/gallery-${image.id}.jpg`}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qQEBALkE2Qjc+PkFBPkdFRUpGR0pPRkFRS0f/2wBDABUXFx4aHh0lHR0lR0E3QUdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 