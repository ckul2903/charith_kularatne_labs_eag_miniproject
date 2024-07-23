package com.summit.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class UserEntity {

    @Column(name = "user_id")
    private @Id String userId;

    @Column(name = "username")
    private String username;
}
