import React from "react";
import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  VStack,
  Flex,
} from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <VStack spacing={4} w="full" p={4}>
      <Skeleton height="40px" width="150px" />
      <Skeleton height="40px" width="100%" />
      <Flex w="full" justify="space-between" wrap="wrap" gap={4}>
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            w={{ base: "100%", md: "30%" }}
            p={3}
            bg="gray.50"
            borderRadius="md"
            boxShadow="md"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt={4} noOfLines={4} spacing="4" />
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};

export default LoadingSkeleton;
